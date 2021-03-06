import React from 'react'

const SelectField = ({htmlFor="", label="", name="", id="", placeholder="", value="",
                        disabled=false, required=false, options=[], event={function(){return null}} ,
                        optionValue="", optionName="", optionDisabled= false, errorClass=""
                    }) => {
        return (
            <div className="form-group">
                <label htmlFor={htmlFor}> 
                    { label } 
                    { required && <span className="champObligatoire"><sup>*</sup></span>} {/* N'est visible que si le champ est obligatoire*/}
                </label>
                <select 
                    name={name} 
                    id={id}
                    className={ `form-control ${errorClass}` }
                    placeholder={ placeholder }
                    onChange={(e) => event(e)}
                    disabled={disabled}
                    required={required}
                    value={value}
                >
                {/* Loop s'il y a des options sinon return option "Pas d'options" */}
                {
                    options 
                    ? <> 
                        <option>Choisir...</option> 
                        {
                            options.map((opt, index) => (  
                            <option key={index} value={ opt[optionValue]} disabled={ opt.optionDisabled } > { opt[optionName] } </option>
                        ))
                        } 
                    </>
                    :
                        <option>Pas d'options...</option>
                }
                </select>
            </div>
        )
}

export default SelectField;
