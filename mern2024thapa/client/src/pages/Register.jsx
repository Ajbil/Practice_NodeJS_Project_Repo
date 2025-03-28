import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";

export const Register = () => {                //This code defines a functional component named Register
    //State Declaration: 
  const [user, setUser] = useState({        //. The user object has properties for username, email, phone, and password
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();

  //Event Handler for Input Changes:  It updates the user state when the user types into the input fields
  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user, // it is spread operatore matlab    jo user object mao pehle se entered data hai vo toh as it it pass to setUser and nneche vali line represents the field whichw we are changing
      [name]: value, //here this name i have wriiten like this in [] beacuse i made it dynamic variable    -->  see last bonus part of video to understand 
    });
  };

  // handle form on submit
  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(user); // user object mai maine data store kara liya jo user ne entrt kiya ab toh bas isko backend se connect karte vakt yeah user object ko pass kardena hai 

    //conect backend woth frontend part
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if(response.ok){
      const res_data = await response.json();          // in this res_data i will get threee things from servre i.e messgae, id and token 
      console.log("response from server", res_data);
      //store the token in local storage
      storeTokenInLS(res_data.token);


      setUser({
        username: "",
        email: "",
        phone: "",
        password: "",
      });
      navigate("/login");
    }
    console.log(response);
    } catch (error) {
      console.log("register", error);
    }
    
  };

  //  Help me reach 1 Million subs 👉 https://youtube.com/thapatechnical

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};