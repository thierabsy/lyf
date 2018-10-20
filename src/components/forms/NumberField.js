import React from 'react'

const NumberField = ({htmlFor="", label="", name="", id="", placeholder="", value="",
                        disabled=false, required=false, event={function(){return null}}
                    }) => {
    return (
        <div className="form-group">
            <label htmlFor={htmlFor}> 
                { label } 
                { required && <span className="champObligatoire"><sup>*</sup></span>} {/* N'est visible que si le champ est obligatoire*/}
            </label>
            <input 
                type="number"
                name={name} 
                id={id}
                className="form-control" 
                placeholder={ placeholder }
                onChange={(e) => event(e)}
                disabled={disabled}
                required={required}
                value={value}
            />
        </div>
    )
}

export default NumberField;
