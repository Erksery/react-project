import React from "react";

function ModalClose({ setOpenAddListBooksTaken, setOpenDeleteBook }) {
  return (
    <div
      onClick={() => {
        setOpenAddListBooksTaken(false);
        setOpenDeleteBook(false);
      }}
      style={{
        position: "fixed",
        height: "100vh",
        width: "100%",
        background: "rgba(0,0,0, 0.30)",
        zIndex: 100,
      }}
    />
  );
}

export default ModalClose;
