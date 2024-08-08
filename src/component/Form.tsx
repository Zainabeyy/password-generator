import React from "react";

type handlePasswordData={
  handlePassword:(value:string)=>void
}
export default function Form(props:handlePasswordData) {
  const [formData, setformData] = React.useState({
    length: 1,
    uppercase: true,
    lowercase: true,
    numbers: false,
    symbols: false,
  });
  const uppercase = [
    "A","B","C","D","E",
    "F","G","H","I","J",
    "K","L","M","N","O",
    "P","Q","R","S","T",
    "U","V","W","X",
    "Y","Z",
  ];
  const lowercaseCharacters: string[] = [
    'a', 'b', 'c', 'd', 'e',
    'f', 'g', 'h', 'i', 'j', 
    'k', 'l', 'm', 'n', 'o', 
    'p', 'q', 'r', 's', 't', 
    'u', 'v', 'w', 'x', 'y', 'z'
  ];
  const symbols: string[] = [
    '!', '@', '#', '$', '%', 
    '^', '&', '*', '(', ')', 
    '-', '_', '=', '+', '{', 
    '}', '[', ']', '|', '\\', 
    ':', ';', '"', "'", '<', 
    '>', ',', '.', '/', '?'
  ];
  const numbers: string[] = [
    '0', '1', '2', '3', '4', 
    '5', '6', '7', '8', '9'
  ];
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked, type, value } = event.target;
    setformData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  React.useEffect(() => {
    const percentage = ((formData.length - 1) / (15 - 1)) * 100;
    const gradient = `linear-gradient(to right, var(--btn-bg-color) ${percentage}%, var(--range-line) ${percentage}%)`;
    document.getElementById("length")!.style.background = gradient;
  }, [formData.length]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let Characters:string[]=[];
    let password='';
    if(formData.uppercase === true){
      Characters=Characters.concat(uppercase);
    }
    if(formData.lowercase === true){
      Characters=Characters.concat(lowercaseCharacters);
    }
    if(formData.numbers === true){
      Characters=Characters.concat(numbers);
    }
    if(formData.symbols === true){
      Characters=Characters.concat(symbols);
    }
    if((formData.uppercase || formData.lowercase || formData.numbers || formData.symbols) === true){
      for(let i=0 ; i<formData.length ; i++){
        let randomNum=Math.floor(Math.random()*Characters.length);
        password+=Characters[randomNum];
      }
    }
    props.handlePassword(password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="length" className="lengthLabel">
        Password Length
        <span className="lengthValue">{formData.length}</span>
        <input
          type="range"
          name="length"
          id="length"
          min="1"
          max="15"
          value={formData.length}
          onChange={handleChange}
        />
      </label>
      <label className="checkboxLabel" htmlFor="uppercase">
        <input
          onChange={handleChange}
          checked={formData.uppercase}
          type="checkbox"
          name="uppercase"
          id="uppercase"
          className="checkBoxInput"
        />
        <span className="checkmark"></span>
        Include Uppercase Letters
      </label>
      <label className="checkboxLabel" htmlFor="lowercase">
        <input
          onChange={handleChange}
          checked={formData.lowercase}
          type="checkbox"
          name="lowercase"
          id="lowercase"
          className="checkBoxInput"
        />
        <span className="checkmark"></span>
        Include Lowercase Letters
      </label>
      <label className="checkboxLabel" htmlFor="numbers">
        <input
          onChange={handleChange}
          checked={formData.numbers}
          type="checkbox"
          name="numbers"
          id="numbers"
          className="checkBoxInput"
        />
        <span className="checkmark"></span>
        Include Numbers
      </label>
      <label className="checkboxLabel" htmlFor="symbols">
        <input
          onChange={handleChange}
          checked={formData.symbols}
          type="checkbox"
          name="symbols"
          id="symbols"
          className="checkBoxInput"
        />
        <span className="checkmark"></span>
        Include Symbols
      </label>
      <button type="submit" className="submit">
        Generate passwords
      </button>
    </form>
  );
}
