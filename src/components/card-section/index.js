import React from "react";
import './index.css';
import Card from './../card';

const CardSection = (props) => {
    let cards;

    switch ( props.type ) {
        case 'characters':
            cards = props.data.map( ( element ) => {
                return (
                    <Card
                        title={ element.name }
                        thumbnail={ element.thumbnail }
                    />
                );
            });
            break;
    }
    
    return (
        <section className="card-section">
            <h2>{ props.title }</h2>
            <div className="card-container">
                { cards }
            </div>
        </section>
    );
};

export default CardSection;