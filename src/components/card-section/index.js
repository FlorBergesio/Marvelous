import React, {useContext} from "react";
import './index.css';
import Card from './../card';
import { EntityContext } from './../../App';

const CardSection = (props) => {

    const entity = useContext(EntityContext);

    let cards;

    switch ( entity ) {
        case 'characters':
            cards = props.data.map( ( element ) => {
                return (
                    <Card
                        key={ element.id }
                        title={ element.name }
                        thumbnail={ element.thumbnail }
                    />
                );
            });
        break;

        case 'comics':
            cards = props.data.map( ( element ) => {
                return (
                    <Card
                        key={ element.id }
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
            <h2>{ entity.slice(0,1).toUpperCase() + entity.slice(1) }</h2>
            <div className="card-container">
                { cards }
            </div>
        </section>
    );
};

export default CardSection;