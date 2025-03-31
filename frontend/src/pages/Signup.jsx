import { useState } from "react";
import { motion } from "framer-motion";
import { Keyboard, Lock, Mail, User2 } from "lucide-react";
import { InputField } from "../components/InputFields";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

const Signup = () => {
  const [inputFormData, setInputFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const loading = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputFormData);
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-bold text-gray-600">
          Create an Account
        </h2>
      </motion.div>
      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 max-w-xs sm:max-w-md mx-auto  ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User2 className="h-5 w-5 text-gray-600" aria-hidden="true" />
                </div>
                <InputField
                  id={"name"}
                  type={"text"}
                  value={inputFormData.name}
                  onChange={(e) =>
                    setInputFormData({ ...inputFormData, name: e.target.value })
                  }
                  placeholder={"Enter your name"}
                />
              </div>
            </div>
            <div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-600" aria-hidden="true" />
                </div>
                <InputField
                  id={"email"}
                  type={"email"}
                  value={inputFormData.email}
                  onChange={(e) =>
                    setInputFormData({
                      ...inputFormData,
                      email: e.target.value,
                    })
                  }
                  placeholder={"Enter your email"}
                />
              </div>
            </div>
            <div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Keyboard
                    className="h-5 w-5 text-gray-600"
                    aria-hidden="true"
                  />
                </div>
                <InputField
                  id={"password"}
                  type={"password"}
                  value={inputFormData.password}
                  onChange={(e) =>
                    setInputFormData({
                      ...inputFormData,
                      password: e.target.value,
                    })
                  }
                  placeholder={"Password"}
                />
              </div>
            </div>
            <div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-600" aria-hidden="true" />
                </div>
                <InputField
                  id={"confirmPassword"}
                  type={"password"}
                  value={inputFormData.confirmPassword}
                  onChange={(e) =>
                    setInputFormData({
                      ...inputFormData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder={"Confirm password"}
                />
              </div>
            </div>
            <Button
              isLoading={loading}
              text={"Signup"}
              loadingText={"Signing up..."}
            />
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to={"/signin"}
              className="font-medium text-blue-600 hover:underline"
            >
              Sign In 
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
