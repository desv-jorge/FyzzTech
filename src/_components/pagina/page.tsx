
import HeaderBar from "../HeaderBar/HeaderBar"
import Main from "../main/main"
import Footer from "../footer/footer"
import './page.scss'
import { useState } from "react";

export default function Page (){

    return(
        <>
        <HeaderBar/>
        <Main/>
        <Footer/>
        </>
    )
}