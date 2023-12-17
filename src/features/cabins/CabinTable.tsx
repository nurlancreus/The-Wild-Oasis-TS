import { useSearchParams } from "react-router-dom";

import { Spinner, Empty, Menus, Table } from "@/ui";
import CabinRow from "./CabinRow";

import { useCabins } from "./useCabins";
import type { ICabin } from "./cabinsSchema";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="cabins" />;

  // 1) Filter
  const filterValue = searchParams.get("discount") || "all";
  const sortByRaw = searchParams.get("sortBy") || "name-asc";

  let filteredCabins: Array<ICabin> = [];

  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0) as ICabin[];
  } else if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount !== 0) as ICabin[];
  } else {
    filteredCabins = cabins as ICabin[];
  }

  // 2) Sort
  const [field, direction] = sortByRaw.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const compare = (a: ICabin, b: ICabin) => {
    let sortCalc;

    if (typeof a[field] === "string" && typeof b[field] === "string") {
      sortCalc = (a[field] as string)
        .toLowerCase()
        .localeCompare((b[field] as string).toLowerCase());
    } else {
      sortCalc = (a[field] as number) - (b[field] as number);
    }

    sortCalc *= modifier;

    return sortCalc;
  };

  // Short Way
  // const compare = (a, b) => {
  //   if (a[field] === b[field]) return 0;

  //   const sortCalc = a[field] > b[field] ? 1 : -1;
  //   return sortCalc * modifier;
  // };

  const sortedCabins = filteredCabins.sort(compare);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>DIscount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin: ICabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
