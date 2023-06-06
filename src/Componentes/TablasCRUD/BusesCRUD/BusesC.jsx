import React from "react";
import { BusesTabla } from "./busesTabla";
import { useParams } from "react-router-dom";


export function BusesC(){

    const {id_emp} = useParams();

    return(
        <div className="container-crud">
           <BusesTabla il={id_emp} />
        </div>
    );
}
