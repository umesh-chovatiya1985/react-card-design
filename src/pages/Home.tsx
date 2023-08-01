import React, {useState, useEffect} from 'react'
import ProductCard from '../components/productCard'
import { product } from '../models/product'
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home() {

    const [sampleData, setSampleData] = useState<product[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [pageNo, setPageNo] = useState<number>(0);
    const [isRefresh, setIsRefresh] = useState<boolean>(false);

    const getRecords = async () => {
        try {
            const jsonReq = await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/6/${pageNo}`);
            if(jsonReq.ok){
                const jsonRespo = await jsonReq.json();
                if(jsonRespo.length > 0){
                    setSampleData(sampleData => sampleData.concat(jsonRespo));
                }
                else {
                    setHasMore(false);
                }
            }
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getRecords();
    }, [pageNo]);

    const fetchData = () => {
        console.log("I am calling now");
        setPageNo(pageNo => (pageNo + 1));
    }

    const refresh = () => {
        console.log("I am refresh now");
        setPageNo(0);
        setHasMore(true);
    }

  return (
    <>
        <div className='p-3'>
            <h1 className='text-center text-2xl text-center font-semibold'>Books</h1>
        </div>
        <InfiniteScroll
            dataLength={sampleData.length} //This is important field to render the next data
            next={() => {
              fetchData();
            }}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Opps! all in list</b>
              </p>
            }
            // below props only if you need pull down functionality
            refreshFunction={refresh}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                Pull down to refresh
              </h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                Release to refresh
              </h3>
            }
        >
        <div className='grid gap-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6'>
            {sampleData && 
                sampleData.map((item, index) => (
                    <ProductCard key={index} {...item}></ProductCard>
                ))
            }
        </div>
        </InfiniteScroll>
    </>
  )
}
