import axios from "axios";

//const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

export const getPlacesData = async(type, sw, ne) => {
    try {
       const {data:{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
          'X-RapidAPI-Key': 'efd2f518e4mshdb3d3342c4edbadp1cd4e9jsn599b4590acaf'
        }
      });

       return data;
    } catch (error) {
        console.log(error);
    }
}