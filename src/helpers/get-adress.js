export async function getAdress(ip = '8.8.8.8') {
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_CVJ9Z2vKPi5Qo32pVyeeMvcBM2qYl&ipAddress=${ip}`);
    return await response.json()
}