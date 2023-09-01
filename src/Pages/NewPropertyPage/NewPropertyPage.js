import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./NewPropertyPage.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Header from "../../Components/Header/Header";

function NewPropertyPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [agency, setAgency] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [reception, setReception] = useState("");
  const [pets, setPets] = useState("");
  const [outdoor, setOutdoor] = useState("");
  const [picture, setPicture] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [postcodeError, setPostcodeError] = useState(false);
  const [agencyError, setAgencyError] = useState(false);
  const [bedroomsError, setBedroomsError] = useState(false);
  const [receptionError, setReceptionError] = useState(false);
  const [petsError, setPetsError] = useState(false);
  const [outdoorError, setOutdoorError] = useState(false);
  const [pictureError, setPictureError] = useState(false);

  const [isCheckedReception, setIsCheckedReception] = useState(false);
  const [isCheckedPets, setIsCheckedPets] = useState(false);
  const [isCheckedOutdoor, setIsCheckedOutdoor] = useState(false);

  const [success, setSuccess] = useState(false);

  //authentication to use firebase
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
  };

  // //implementing functionality for uploading the image
  // const app = initializeApp(firebaseConfig);
  // const storage = getStorage(app, `gs://${firebaseConfig.storageBucket}`);
  // const uploadImageProperty = async (imageFile) => {
  //   console.log("imageFile:", imageFile);
  //   const storageRef = ref(storage, `${imageFile[0].name}`);
  //   console.log(storageRef);

  //   try {
  //     await uploadBytes(storageRef, imageFile[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   const url = await getDownloadURL(ref(storage, storageRef.fullPath));
  //   setImageUrl(url);
  // };
  // //this is the url of the uploaded image that will be used in the axios request
  // console.log(imageUrl);
  const handleAddTitle = (event) => {
    setTitle(event.target.value);
    console.log(setTitle);
  };
  const handleAddAddress = (event) => {
    setAddress(event.target.value);
    console.log(setAddress);
  };
  const handleAddPostcode = (event) => {
    setPostcode(event.target.value);
    console.log(setPostcode);
  };
  const handleAddAgency = (event) => {
    setAgency(event.target.value);
    console.log(setAgency);
  };
  const handleAddBedrooms = (event) => {
    setBedrooms(event.target.value);
    console.log(setBedrooms);
  };
  const handleAddReception = (event) => {
    setReception(event.target.value);
    setIsCheckedReception(!isCheckedReception);
    console.log(setReception);
  };

  const handleAddPets = (event) => {
    setPets(event.target.value);
    setIsCheckedPets(!isCheckedPets);
    console.log(setPets);
  };
  const handleAddOutdoor = (event) => {
    setOutdoor(event.target.value);
    setIsCheckedOutdoor(!isCheckedOutdoor);
    console.log(setOutdoor);
  };
  const handleAddPicture = (event) => {
    setPicture(event.target.files);
    // we add the uploaded picture
  };
  console.log(picture);
  const handlePropertySubmit = async (event) => {
    event.preventDefault();

    //we transform the checkbox results into 0 or 1 to send the right type of data to the api
    const receptionValue = isCheckedReception;
    const petsValue = isCheckedPets;
    const outdoorValue = isCheckedOutdoor;

    //add validation
    if (title === "") {
      console.log(title);
      setTitleError(true);
      setTimeout(() => {
        setTitleError(false);
      }, 2000);
    }

    if (address === "") {
      console.log(address);
      setAddressError(true);
      setTimeout(() => {
        setAddressError(false);
      }, 2000);
    }

    if (postcode === "") {
      console.log(postcode);
      setPostcodeError(true);
      setTimeout(() => {
        setPostcodeError(false);
      }, 2000);
    }

    if (agency === "") {
      console.log(agency);
      setAgencyError(true);
      setTimeout(() => {
        setAgencyError(false);
      }, 2000);
    }

    if (bedrooms === "") {
      console.log(bedrooms);
      setBedroomsError(true);
    }

    if (reception === "") {
      console.log(reception);
      setReceptionError(true);
      setTimeout(() => {
        setReceptionError(false);
      }, 2000);
    }

    if (pets === "") {
      console.log(pets);
      setPetsError(true);
      setTimeout(() => {
        setPetsError(false);
      }, 2000);
    }

    if (outdoor === "") {
      console.log(outdoor);
      setOutdoorError(true);
      setTimeout(() => {
        setOutdoorError(false);
      }, 2000);
    }

    if (picture === "") {
      console.log(picture);
      setPictureError(true);
      setTimeout(() => {
        setPictureError(false);
      }, 2000);
    }

    console.log(
      "input values",
      title,
      address,
      postcode,
      agency,
      bedrooms,
      reception,
      pets,
      outdoor,
      picture
    );
    console.log(
      titleError,
      addressError,
      postcodeError,
      agencyError,
      bedroomsError,
      receptionError,
      petsError,
      outdoorError,
      pictureError
    );

    if (
      titleError ||
      addressError ||
      postcodeError ||
      agencyError ||
      bedroomsError ||
      receptionError ||
      petsError ||
      outdoorError ||
      pictureError
    ) {
      return;
    }

    try {
      //implementing functionality for uploading the image
      const app = initializeApp(firebaseConfig);
      const storage = getStorage(app, `gs://${firebaseConfig.storageBucket}`);
      console.log("imageFile:", `${picture[0].name}`);
      const storageRef = ref(storage, `${picture[0].name}`);
      console.log(storageRef);

      await uploadBytes(storageRef, picture[0]);
      const imageUrl = await getDownloadURL(ref(storage, storageRef.fullPath));
      setImageUrl(imageUrl);
      console.log(imageUrl);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/properties/add`,
        {
          title: title,
          address: address,
          postcode: postcode,
          bedrooms: bedrooms,
          agency: agency,
          reception: receptionValue,
          pets: petsValue,
          outdoor: outdoorValue,
          picture: imageUrl, //here we send the url of the uploaded image
        }
      );
      console.log("Property added successfully", response.data);
      //empty the form after submission
      setTitle("");
      setAddress("");
      setPostcode("");
      setBedrooms("");
      setReception("");
      setPets("");
      setOutdoor("");
      setPicture("");
      setImageUrl("");
      setSuccess(true);
    } catch (error) {
      console.log(error);
      console.error(`Error adding the property`);
    }
  };

  return (
    <>
      <Header />
      <section className="property-form__container">
        <form className="property-form" onSubmit={handlePropertySubmit}>
          <label htmlFor="title" className="property-form__label">
            Please add a short description of the property.
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Describe the most relevant features of the property..."
            className={`property-form__input ${
              titleError ? "property-form__input-error" : null
            }`}
            value={title}
            onChange={handleAddTitle}
          />
          <label htmlFor="address" className="property-form__label">
            Please add the address of the property.
          </label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Add the address..."
            className="property-form__input"
            value={address}
            onChange={handleAddAddress}
          />
          <label htmlFor="postcode" className="property-form__label">
            Please add the postcode of the property.
          </label>
          <input
            type="text"
            name="postcode"
            id="postcode"
            placeholder="Add the postcode..."
            className="property-form__input"
            value={postcode}
            onChange={handleAddPostcode}
          />
          <label htmlFor="agency" className="property-form__label">
            Please add the estate agent that is managing the property.
          </label>
          <input
            type="text"
            name="agency"
            id="agency"
            placeholder="Add the estate agents..."
            className="property-form__input"
            value={agency}
            onChange={handleAddAgency}
          />
          <label htmlFor="bedrooms" className="property-form__label">
            How many bedrooms are there?
          </label>
          <select
            name="bedrooms"
            id="bedrooms"
            className="property-form__input"
            value={bedrooms}
            onChange={handleAddBedrooms}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <div className="property-form__reception">
            <label htmlFor="reception" className="property-form__label">
              Are there common spaces such as living room, reception room, etc.?
            </label>
            <input
              type="checkbox"
              name="reception"
              id="reception"
              checked={isCheckedReception}
              value={reception || []}
              onChange={handleAddReception}
              className="property-form__input"
            />
          </div>
          <div className="property-form__pets">
            <label htmlFor="pets" className="property-form__label">
              Are pets allowed in this property?
            </label>
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={isCheckedPets}
              value={pets}
              onChange={handleAddPets}
              className="property-form__input"
            />
          </div>
          <div className="property-form__outdoor">
            <label htmlFor="outdoor" className="property-form__label">
              Are there any outdoor spaces in this property such as balcony,
              terrace, garden, etc.?
            </label>
            <input
              type="checkbox"
              name="outdoor"
              id="outdoor"
              checked={isCheckedOutdoor}
              value={outdoor}
              onChange={handleAddOutdoor}
              className="property-form__input"
            />
          </div>
          <div className="property-form__picture">
            <label htmlFor="picture" className="property-form__label">
              Upload pictures of the property
            </label>
            <input
              type="file"
              name="picture"
              id="picture"
              accept="image/png, image/jpeg"
              onChange={handleAddPicture}
              className="property-form__input"
            />
          </div>
          <button className="property-form__button">Add Property</button>
        </form>
        {success && (
          <div className="success-message">
            Property has been successfully added!
            <Link to="/properties">View Property</Link>
          </div>
        )}
      </section>
    </>
  );
}
export default NewPropertyPage;
