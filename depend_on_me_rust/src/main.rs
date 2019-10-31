 #![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[post("/account")]
fn create_user() -> &'static str {
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
fn create_user() -> &'static str {
    "Hello world!"
}

fn main() {
    rocket::ignite().mount("/", routes![index]).launch();
}
