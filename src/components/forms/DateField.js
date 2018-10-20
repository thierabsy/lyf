import React from 'react'

const DateField = ({htmlFor="", label="", name="", id="", placeholder="", value="", min="01/01/2010",
                    max="01/01/2010", disabled=false, required=false, event={function(){return null}}
                    }) => {
    return (
        <div className="form-group">
            <label htmlFor={htmlFor}> 
                { label } 
                { required && <span className="champObligatoire"><sup>*</sup></span>} {/* N'est visible que si le champ est obligatoire*/}
            </label>
            <input 
                type="date"
                name={name} 
                id={id}
                min={min}
                max={max}
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

export default DateField;
