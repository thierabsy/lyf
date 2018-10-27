import React from 'react';

const MessageAlert = ({errors, message, fermeErrors}) => <div className={ `MessageAlert ${message !== "" ? "success" : "error"}` }>
                        {
                            message !== "" ?
                            <>
                                <div className="success-message"> { message } </div>
                            </> 
                            :
                            <> 
                                <h5>Veuillez renseigner les champs obligatoires:</h5>
                                <ul>
                                    {
                                        errors &&
                                        errors.map( (err, index) => <li key={index}> { err } </li>)
                                    }
                                </ul>
                            </>
                        }
                        <hr />
                        <button className="btn btn-info" onClick={() => fermeErrors()}>Fermer</button>
                    </div>

export default MessageAlert;