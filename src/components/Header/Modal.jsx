import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const style = {
  transform: "translate(-50%, -50%)",
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {user} = useContext(UserContext)


  const handleLogOut = async () =>{
    await localStorage.removeItem("nuser");
    await localStorage.removeItem("token");
    await localStorage.removeItem("role");
    
     window.location.replace("/");
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        <img
          src={user.userImage}
          alt=""
          className=" relative w-12 h-12 rounded-full"
        />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="absolute top-1/2 left-1/2 p-4 w-[90%] md:w-[20%] "
        >
          <div class="my-4">
            <div class="bg-white rounded overflow-hidden shadow-lg">
              <div class="text-center p-6 border-b "> 
                <img
                  class="h-24 w-24 rounded-full mx-auto"
                  src={user.userImage}
                  alt={user.user}
                />
                <p class="pt-2 text-lg font-semibold overflow-hidden">
                  {user.user}
                </p>
                <p class="text-sm text-gray-600 overflow-hidden">
                  {user.userEmail} 
                </p>
              </div>

              <div class="">
                <a href="/" class="px-4 py-2 pb-4 hover:bg-gray-100 flex">
                  <p class="text-sm font-medium mx-auto items-center text-red-600 leading-none">
                    <button onClick={handleLogOut}>Logout ?</button>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
