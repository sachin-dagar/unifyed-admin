import React from "react";

const InvolvComingSoon = () => {
  return (
    <div className="w-full py-12 flex flex-col items-center justify-center bg-white rounded-md shadow">
      <div className="max-h-500 h-full min-h-400 w-500">
        <img
          src="/images/creator-amico.svg"
          className="h-full w-full"
          alt="comming soon"
        />
      </div>
      <div className="text-xl text-grayInvolv-900 py-8">
        This page is currently being worked upon and will be ready soon!
      </div>
    </div>
  );
};

export default InvolvComingSoon;
