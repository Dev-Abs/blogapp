import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const SubscriptionAlert = ({alert}) => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  useEffect(() => {
    token = localStorage.getItem("token");
  });

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
    {token && (
      <div
        id="alert-border-2"
        className={`${alert ? 'mt-2' : 'mt-20' } flex items-center p-4 mb-4 text-yellow-800 border-t-4 border-yellow-300 dark:text-yellow-300 dark:bg-slate-600 dark:border-yellow-800`}
        role="alert"
      >
        <svg
          className="flex-shrink-0 w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <div className="ms-3 text-sm font-medium">
          Unlock exclusive content and premium features by subscribing today!{" "}
          <a
            onClick={() => {
              navigate("/pricing");
              handleClose();
            }}
            className="font-semibold underline hover:no-underline cursor-pointer"
          >
            Subscribe now
          </a>
          .
        </div>
      </div>)}
    </>
  );
};

export default SubscriptionAlert;
