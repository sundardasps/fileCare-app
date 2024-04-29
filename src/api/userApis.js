import Interseptor from "../utils/interseptor";

export async function login(data) {
  try {
    const respose = await Interseptor.post("/login", data);
    return respose;
  } catch (error) {
    console.log(error);
  }
}

export async function register(data) {
  try {
    const respose = await Interseptor.post("/register", data);
    return respose;
  } catch (error) {
    console.log(error);
  }
}

export async function otpVerification(otp, email) {
  try {
    const result = await Interseptor.get(`/otpVerify/${otp}/${email}`);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function resendOtp(email) {
  try {
    const result = await Interseptor.get(`/resendOtp/${email}`);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function checkFile(uniqueId) {
  try {
    const result = await Interseptor.get(`/checkFile/${uniqueId}`);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}


export async function deleteFile(fileId) {
  try {
    const result = await Interseptor.get(`/deleteFile/${fileId}`);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function fetchFiles({Search,page,filter}) {
  try {
    const result = await Interseptor.get(`/fetchFiles`,{params:{Search,page,filter}});
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function downloadFile(uniqueId) {
  try {
    const result = await Interseptor.get(`/downloadFile/${uniqueId}`,{responseType:"blob"});
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

