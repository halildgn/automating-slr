use std::borrow::BorrowMut;
use std::process::{Command};
use command_group::{CommandGroup, GroupChild};
use tauri::api::process::Command as TCommand;

pub struct APIManager {
    cmd: Command,
    child: Option<GroupChild>,
}

impl APIManager {
    pub fn new() -> APIManager {
        let command = Command::from(
    TCommand::new_sidecar("automating-slr-colaps")
        .expect("Failed to run backend as a sidecar"),
    );
        APIManager {
            cmd: command,
            child: None,
        }
    }

    pub fn start_backend(&mut self) -> Result<String, String> {
        match self.child.borrow_mut() {
            Some(_) => {
                let info = "Backend is already running and will not be created again";
                println!("{}", &info);
                Ok(info.into())
            }
            None => {
                let child = self.cmd.group_spawn();
                match child {
                    Ok(v) => {
                        self.child = Some(v);
                        let info = "Backend start successful";
                        println!("{}", &info);
                        Ok(info.into())
                    }
                    Err(_) => {
                        let info = "Backend start failed";
                        println!("{}", &info);
                        Err(info.into())
                    }
                }
            }
        }     
    }

    pub fn terminate_backend(&mut self) -> Result<String, String> {
        match self.child.borrow_mut() {
            Some(child) => {
                child
                    .kill()
                    .expect("An error occured while killing the backend");
                self.child = None;
                let info = "Backend was successfully killed";
                println!("{}", &info);
                Ok(info.into())
            }
            _ => {
                let info = "Backend is currently not running, so no kill operation is required";
                println!("{}", &info);
                Ok(info.into())
            }
        }
    }
}
