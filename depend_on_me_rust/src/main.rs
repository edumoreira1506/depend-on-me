 #![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
	

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[post("/account")]
/// Returns a JSON object with user information.
/// 
/// Takes in a the following arguments in a form:
///  * request_username: str
///  * request_first_name: str
///  * request_last_name: str
///  * request_password: str
///  * request_email: str
///
/// Returns:
///  * 200 OK if successfule
///  * 409 CONFLICT if username still exists
fn create_user() -> &'static str {
    "Not implemented."
}

#[get("/account")]
fn get_user() -> &'static str {
    /// Returns a JSON object with user information.
    /// 
    /// Takes in a the following arguments in a form:
    ///  * request_username: str
    ///  * auth_username: str
    ///  * auth_password: str
    ///
    /// Returns:
    ///  * 200 OK if successful
    ///  * 409 CONFLICT if username still exists
    "Not implemented."
}

#[post("/login")]
fn login() -> &'static str {
    "Hello world!"
}

fn r() -> rocket::Rocket {
    rocket::ignite().mount("/", routes![index, create_user, get_user, login])
}

fn main() {
    r().launch();
}


#[cfg(test)]
mod test {
    use super::rocket;
    use super::r;
    use rocket::local::Client;
    use rocket::http::Status;

    #[test]
    fn test_get_index() {
        let client = Client::new(r()).expect("valid rocket instance");
        let mut response = client.get("/").dispatch();

        assert_eq!(response.status(), Status::Ok);
        assert_eq!(response.body_string(), Some("Hello, world!".into()));
    }

    #[test]
    fn test_get_account() {
        let client = Client::new(r()).expect("valid rocket instance");
        let mut response = client.get("/account").dispatch();

        assert_eq!(response.status(), Status::Ok);
        assert_eq!(response.body_string(), Some("Not implemented.".into()));
    }
}