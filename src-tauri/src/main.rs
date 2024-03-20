// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::api::process::Command;

fn main() {
    tauri::Builder::default()
 .setup(|_app| {

 let (mut _rx, mut _child) = Command::new_sidecar("hello-random")
                .expect("failed to create `my-sidecar` binary command")
                    .spawn()
                    .expect("Failed to spawn backend sidecar");
      Ok(())
    })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
