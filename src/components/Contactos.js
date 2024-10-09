import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/main.css';
import Navbar from './Navbar.js';

const Contactos = () => {
    return (
        <div>
            <Navbar/>
            <footer id="footer">
                <section>
                    <form method="post" action="#">
                        <div class="fields">
                            <div class="field">
                                <label for="name">Name</label>
                                <input type="text" name="name" id="name" />
                            </div>
                            <div class="field">
                                <label for="email">Email</label>
                                <input type="text" name="email" id="email" />
                            </div>
                            <div class="field">
                                <label for="message">Message</label>
                                <textarea name="message" id="message" rows="3"></textarea>
                            </div>
                        </div>
                        <ul class="actions">
                            <li><input type="submit" value="Send Message" /></li>
                        </ul>
                    </form>
                </section>
                <section class="split contact">
                    <section class="alt">
                        <h3>Address</h3>
                        <p>Somewhere in Nevada</p>
                    </section>
                    <section>
                        <h3>Phone</h3>
                        <p>(000) 000-0000</p>
                    </section>
                    <section>
                        <h3>Email</h3>
                        <p>relojes@mail.com</p>
                    </section>
                    <section>
                        <h3>Redes sociales</h3>
                        <ul class="icons alt">
                            <li><a href="#" class="icon brands alt fa-twitter"><span class="label">Twitter</span></a></li>
                            <li><a href="#" class="icon brands alt fa-facebook-f"><span class="label">Facebook</span></a></li>
                            <li><a href="#" class="icon brands alt fa-instagram"><span class="label">Instagram</span></a></li>
                        </ul>
                    </section>
                </section>
            </footer>
        </div>
    );
};

export default Contactos;