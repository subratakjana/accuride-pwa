import axios from "axios";

const getIpDetails = async () => {
  let clientIp = sessionStorage.getItem("ipstack") || "-";
  if (!sessionStorage.ipstack) {
    const response = await axios.get(
      `https://api.ipstack.com/check?access_key=${process.env.NEXT_PUBLIC_IPSTACK_ACCESS_KEY}`,
    );
    if (!response.data.error) {
      clientIp = response.data.ip;
    }
  }
  sessionStorage.setItem("ipstack", clientIp);
  return clientIp;
};

export default getIpDetails;
