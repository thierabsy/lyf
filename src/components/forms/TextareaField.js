import React from 'react'

const TextareaField = ({htmlFor="", label="", name="", id="", placeholder="", value="", row="3",
                        disabled=false, required=false, event={function(){return null}} 
                    }) => {
    return (
        <div className="form-group">
            <label htmlFor={htmlFor}> 
                { label } 
                { required && <span className="champObligatoire"><sup>*</sup></span>} {/* N'est visible que si le champ est obligatoire*/}
            </label>
            <textarea 
                name={name} 
                id={id}
                className="form-control" 
                placeholder={ placeholder }
                onChange={(e) => event(e)}
                disabled={disabled}
                required={required}
                value={value}
                row={row}
            />
        </div>
    )
}

export default TextareaField;
