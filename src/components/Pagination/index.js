import React, { useEffect, useState,useContext } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {PaginateWrapper} from './Pagination.style';
import {MovieContext} from '../../App';
export const Paginate = (props) => {

  const consumer = useContext(MovieContext);
  const [currentPage,setcurrentPage] = useState(1);

  const pageSetter=async(page)=>{
    setcurrentPage(page);
    props.onPageChanged(page);
    console.log(page);
  }
  const pageIncreaser=()=>{
    if(currentPage+1 <=  consumer.totalPages) 
    {
      setcurrentPage(currentPage+1);
      props.onPageChanged(currentPage+1);
      console.log(currentPage+1);
    }
  }
  const pageDecreaser=()=>{
    setcurrentPage(currentPage-1);
    props.onPageChanged(currentPage-1);
    console.log(currentPage-1);
  }
  useEffect(
    ()=>setcurrentPage(1)
  ,[consumer.isSearched])
  return (
    <PaginateWrapper>
        <Pagination aria-label="Page navigation example">
          <PaginationItem>
            <PaginationLink first href="#"  onClick={()=>pageSetter(1)} />
          </PaginationItem>
          <PaginationItem disabled={currentPage===1}>
            <PaginationLink previous href="#" onClick={pageDecreaser}/>
          </PaginationItem>
          <PaginationItem >
            <PaginationLink disabled={currentPage < 3} onClick={()=>pageSetter(currentPage-2)}>
              {currentPage >= 3 ? currentPage-2 : "-"}
            </PaginationLink>
          </PaginationItem>
          {/* disabled={props.totalPages<2} */}
          <PaginationItem > 
            <PaginationLink disabled={currentPage < 2} onClick={()=>pageSetter(currentPage-1)}>
            {currentPage >= 2 ? currentPage-1 : "-"}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem active>
            <PaginationLink  href="#" onClick={()=>pageSetter(currentPage)}>
            {currentPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem disabled={currentPage===consumer.totalPages}>
            <PaginationLink href="#" onClick={()=>pageSetter(currentPage+1)}>
            {currentPage < consumer.totalPages? currentPage+1:"-"}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem disabled={currentPage+1>=consumer.totalPages}>
            <PaginationLink href="#" onClick={()=>pageSetter(currentPage+2)}>
            {currentPage+1 < consumer.totalPages? currentPage+2:"-"}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem disabled={currentPage===consumer.totalPages}>
            <PaginationLink next href="#" onClick={pageIncreaser}/>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last href="#"  onClick={()=>pageSetter(consumer.totalPages)}/>
          </PaginationItem>
        </Pagination>
    </PaginateWrapper>
  );
}
