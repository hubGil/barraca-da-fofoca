import { useQuery, UseQueryOptions } from "react-query";
import axios from "axios";

function useBofes(page, options) {
  return useQuery(["bofes"], () => featchBofes(), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
}

async function featchBofes(page) {
  const user = await faunaDBClient.query(
    q.Get(q.Match(q.Index("user_by_email"), q.Casefold(session.user.email)))
  );

  const famous = await Promise.all(
    user.data.bofes.map(async (bofe) => {
      const { data } = await ApiTvmaze.getPersonData(bofe);
      return data;
    })
  );
}
