import React, { useState, useContext } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { StyledDiscover, StyledButtonWrapper } from './Discover.style';
import { MovieContext } from '../../App';
import {years1,years2} from './years';

export const DiscoverMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const consumer = useContext(MovieContext);

    const toggle = (tab) => {
        setIsOpen(!isOpen)
        consumer.setTab(tab);
    };

    const genresSelected=(genresId)=>{
        consumer.setGenresId(genresId);
        consumer.setCurrentPage(1);
    }

    const years1Selected=(year1,year2)=>{
        consumer.setYear1(year1);
        consumer.setYear2(year2);
        consumer.setTab(1);
        consumer.setCurrentPage(1);
    }
    const years2Selected=(year)=>{
        consumer.setYear1(year);
        consumer.setYear2(year);
        consumer.setTab(1);
        consumer.setCurrentPage(1);
    }

    const personSelected=(personId)=>{
        consumer.setPersonId(personId);
        consumer.setCurrentPage(1);
    }

    return (
        <StyledDiscover style={{backgroundColor: '#eee2dc'}}>
            <Button color="info" onClick={()=>toggle(1)} style={{ marginBottom: '1rem' }}>Years of Movies</Button>
            <Button color="info" className="ml-2 mr-2"  onClick={() => toggle(2)} style={{ marginBottom: '1rem' }}>Types of Movies</Button>
            <Button color="info" onClick={() => toggle(3)} style={{ marginBottom: '1rem' }}>Movies of Popular Actors</Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        <StyledButtonWrapper>

                            {consumer.tab == 1 && years1.map(year => <Button 
                                                           onClick={()=>years1Selected(year.year1,year.year2)}
                                                           size="sm" outline >{`${year.year1}...${year.year2}`}</Button>)}
                            {consumer.tab == 1 && years2.map(year => <Button 
                                                            onClick={()=>years2Selected(year.year)}
                                                            size="sm" outline >{`${year.year}`}</Button>)}

                            {consumer.tab == 2 && consumer.genresData && consumer.genresData.map(genres => {
                                return <Button
                                        size="sm" onClick={() => genresSelected(genres.id)}
                                        outline >{genres.name}
                                </Button> })}
                            
                            {consumer.tab==3 && consumer.popularPeopleData && consumer.popularPeopleData.map(person=>{
                                return <Button
                                onClick={()=>personSelected(person.id)}
                                size="sm" outline >{person.name}
                            </Button> })}
                        </StyledButtonWrapper>
                    </CardBody>
                </Card>
            </Collapse>
        </StyledDiscover>
    );
}