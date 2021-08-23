import React from "react";
import './index.css';
import Card from './../card';

const CardSection = (props) => {
    let cards;

    switch ( props.type ) {
        case 'characters':
            cards = props.data.map( ( element, key ) => {
                return (
                    <Card
                        key={key}
                        title={ element.name }
                        thumbnail={ element.thumbnail }
                    />
                );
            });
        break;

        case 'comics':
            cards = props.data.map( ( element, key ) => {
                return (
                    <Card
                        key={key}
                        title={ element.title }
                        thumbnail={ element.thumbnail }
                    />
                );
            });
        break;

        default:
            return (
                <p>Error</p>
            );
        break;
    }
    
    return (
        <section className="card-section">
            <h2>{ props.type.slice(0,1).toUpperCase() + props.type.slice(1) }</h2>
            <div className="card-container">
                { cards }
            </div>
        </section>
    );
};

export default CardSection;