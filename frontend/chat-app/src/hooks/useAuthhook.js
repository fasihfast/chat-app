import {create} from "zustand" // zustand is a global state management library 
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast"
import {io} from "socket.io-client"

const useAuthhook = create ((set,get) =>({
    //set is a constructor
    authUser : null ,  // initially the user will be null as it will be not authenticated initially
    isSigningUp: false ,
    isCheckingAuth : true , // initially it will be true becuase whenever page loads it will check user for auth
    isLoggingIn : false,
    isUpdatingProfile : false,
    onlineUsers :[],
    socket : null,


     checkauth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },


    signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

    logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get.disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

   login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

    get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) =>{
  
      set({ isUpdatingProfile: true });
      try {
        const res = await axiosInstance.put("/auth/updateProfile", data);
        set({ authUser: res.data });
        toast.success("Profile updated successfully");
      } catch (error) {
        console.log("error in update profile:", error);
        toast.error(error.response.data.message);
      } finally {
        set({ isUpdatingProfile: false });
      }
    },

    connectSocket : () =>{

      const {authUser} =get();

      if(!authUser || get().socket?.connected) return ;
      
      const socket = io("https://linkup-e4dw.onrender.com",{
        query:{
           userId: authUser._id,
        }
      });
      
      socket.connect();

    set({socket:socket});

    socket.on("getOnlineUsers", (userIds) => {
    set({ onlineUsers: userIds });
    });

    },

    disconnectSocket : () =>{
      if(get().socket?.connected) get().socket.disconnect();
    }

}))



export default useAuthhook