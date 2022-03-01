import { useQuery, UseQueryOptions } from "react-query";
import axios from "axios";

function useBofes(page, options) {
  return useQuery(["bofes"], () => featchBofes(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
}

async function featchBofes(page) {
  const famous = await Promise.all(
    userBofes.map(async (bofe) => {
      const { data } = await ApiTvmaze.getPersonData(bofe);
      return data;
    })
  );
  return famous;
}

export default useBofes;
