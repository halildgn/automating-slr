#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

pub mod api_manager;

use api_manager::APIManager;
use std::sync::Mutex;
use tauri::{Manager, State, WindowEvent};

struct APIManagerState {
    api_manager_mutex: Mutex<APIManager>,
}

fn main() {
    let api_manager = APIManager::new();
    let ams = APIManagerState {
        api_manager_mutex: Mutex::new(api_manager),
    };

    tauri::Builder::default()
        .manage(ams)
        .setup(move |app| {
            let am: State<APIManagerState> = app.state();
            am.api_manager_mutex
                .lock()
                .unwrap()
                .start_backend()
                .expect("Backend start");
            Ok(())
        })
        .on_window_event(move |event| match event.event() {
            WindowEvent::Destroyed => {
                println!("destroyed!");
                let am: State<APIManagerState> = event.window().state();
                am.api_manager_mutex
                    .lock()
                    .unwrap()
                    .terminate_backend()
                    .expect("Backend terminate");
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
