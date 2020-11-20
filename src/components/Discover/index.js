import React, { useState, useContext } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { StyledDiscover, StyledButtonWrapper } from './Discover.style';
import { MovieContext } from '../../App';
export const DiscoverMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    
    let years = ["< 1980", "1980...1990", "1990...2000", "2000...2004", "2005...2010", "2011...2015", "2016", "2017", "2018", "2019", "2020"];
    const toggle = (tab) => {
        setIsOpen(!isOpen)
        consumer.setTab(tab);
    };
    const consumer = useContext(MovieContext);
    return (
        <StyledDiscover>
            <Button color="primary" onClick={()=>toggle(1)} style={{ marginBottom: '1rem' }}>Years of Movies</Button>
            <Button className="ml-2 mr-2" color="primary" onClick={() => toggle(2)} style={{ marginBottom: '1rem' }}>Types of Movies</Button>
            <Button color="primary" onClick={() => toggle(3)} style={{ marginBottom: '1rem' }}>Populer People's Movies</Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        <StyledButtonWrapper>
                            {consumer.tab == 1 && years.map(e => <Button 
                                                            onClick={()=>props.onSelected()}
                                                            outline color="info">{e}</Button>)}
                            {consumer.tab == 2 && consumer.genresData && consumer.genresData.map(genres => {
                                return <Button
                                    onClick={() => props.onSelected(genres.id)}
                                    outline color="info">{genres.name}
                                </Button>
                            })}
                        </StyledButtonWrapper>
                    </CardBody>
                </Card>
            </Collapse>
        </StyledDiscover>
    );
}