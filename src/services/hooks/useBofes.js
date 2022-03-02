import { useQuery, UseQueryOptions } from "react-query";
import axios from "axios";

function useBofes(teste, options) {
  return useQuery(["bofes"], () => featchBofes(teste), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
}

async function featchBofes(teste) {
  const famous = await Promise.all(
    userBofes.map(async (teste) => {
      const { data } = await ApiTvmaze.getPersonData(teste);
      return data;
    })
  );
  return famous;
}

export default useBofes;
