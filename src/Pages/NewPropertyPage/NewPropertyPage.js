import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./NewPropertyPage.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../Components/Header/Header";
import PhotoCameraFrontOutlinedIcon from "@mui/icons-material/PhotoCameraFrontOutlined";

function NewPropertyPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [agency, setAgency] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [reception, setReception] = useState("");
  const [pets, setPets] = useState("");
  const [outdoor, setOutdoor] = useState("");
  const [picture, setPicture] = useState(null);
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

  //authentication to use firebase to upload images to the cloud storage
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
  };

  const handleAddTitle = (event) => {
    setTitle(event.target.value);
    setTitleError(false);
  };
  const handleAddAddress = (event) => {
    setAddress(event.target.value);
    setAddressError(false);
  };
  const handleAddPostcode = (event) => {
    setPostcode(event.target.value);
    setPostcodeError(false);
  };
  const handleAddAgency = (event) => {
    setAgency(event.target.value);
    setAgencyError(false);
  };
  const handleAddBedrooms = (event) => {
    setBedrooms(event.target.value);
    setBedroomsError(false);
  };
  const handleAddReception = (event) => {
    setReception(event.target.value);
    setIsCheckedReception(!isCheckedReception);
  };

  const handleAddPets = (event) => {
    setPets(event.target.value);
    setIsCheckedPets(!isCheckedPets);
  };
  const handleAddOutdoor = (event) => {
    setOutdoor(event.target.value);
    setIsCheckedOutdoor(!isCheckedOutdoor);
  };
  const handleAddPicture = (event) => {
    setPicture(event.target.files);
    setPictureError(false);
  };

  const handlePropertySubmit = async (event) => {
    event.preventDefault();

    //Checkbox values
    const receptionValue = isCheckedReception;
    const petsValue = isCheckedPets;
    const outdoorValue = isCheckedOutdoor;

    //Form validation
    if (title === "") {
      setTitleError(true);
    }

    if (address === "") {
      setAddressError(true);
    }

    if (postcode === "") {
      setPostcodeError(true);
    }

    if (agency === "") {
      setAgencyError(true);
    }

    if (bedrooms === "") {
      setBedroomsError(true);
    }

    if (!picture) {
      setPictureError(true);
      return;
    }

    if (
      titleError ||
      addressError ||
      postcodeError ||
      agencyError ||
      bedroomsError ||
      pictureError
    ) {
      return <p className="error-message">Please fill al the fields.</p>;
    }

    try {
      //implementing functionality for uploading the image
      const app = initializeApp(firebaseConfig);
      const storage = getStorage(app, `gs://${firebaseConfig.storageBucket}`);

      const storageRef = ref(storage, `property_${picture[0].name}`);

      await uploadBytes(storageRef, picture[0]);
      const imageUrl = await getDownloadURL(ref(storage, storageRef.fullPath));
      setImageUrl(imageUrl);

      //axios request at the same time of the upload image function
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

      //Empty the form after submission
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
      console.error(`Error adding the property`, error);
    }
  };

  return (
    <>
      <Header />

      <section className="property-form__container">
        <div className="property__title-container">
          <h2 className="property__title">New Property</h2>
        </div>
        <form className="property-form" onSubmit={handlePropertySubmit}>
          <div className="property-form__wrapper">
            <label htmlFor="title" className="property-form__label">
              Please add a short description of the property
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Describe the most relevant features of the property..."
              className={`property-form__input ${
                titleError ? "property-form__input--error" : null
              }`}
              value={title}
              onChange={handleAddTitle}
            />
            {titleError && <p className="error-message">Please add a title.</p>}

            <label htmlFor="address" className="property-form__label">
              Please add the address of the property (this won't be shared
              publicly)
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Add the address..."
              className={`property-form__input ${
                titleError ? "property-form__input--error" : null
              }`}
              value={address}
              onChange={handleAddAddress}
            />
            {addressError && (
              <p className="error-message">Please add an address.</p>
            )}
            <label htmlFor="postcode" className="property-form__label">
              Please add the postcode of the property
            </label>
            <input
              type="text"
              name="postcode"
              id="postcode"
              placeholder="Add the postcode..."
              className={`property-form__input ${
                titleError ? "property-form__input--error" : null
              }`}
              value={postcode}
              onChange={handleAddPostcode}
            />
            {postcodeError && (
              <p className="error-message">Please add a postcode.</p>
            )}
            <label htmlFor="agency" className="property-form__label">
              Please add the estate agent that is managing the property
            </label>
            <input
              type="text"
              name="agency"
              id="agency"
              placeholder="Add the estate agents..."
              className={`property-form__input ${
                titleError ? "property-form__input--error" : null
              }`}
              value={agency}
              onChange={handleAddAgency}
            />
            {agencyError && (
              <p className="error-message">
                Please add the name of the letting agent.
              </p>
            )}
            <label htmlFor="bedrooms" className="property-form__label">
              How many bedrooms are there?
            </label>
            <select
              name="bedrooms"
              id="bedrooms"
              className={`property-form__input ${
                titleError ? "property-form__input--error" : null
              }`}
              value={bedrooms}
              onChange={handleAddBedrooms}
            >
              <option value="none" className="property-form_option">
                Select a Value
              </option>
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
            {bedroomsError && (
              <p className="error-message">
                Please select the number of bedrooms.
              </p>
            )}
            <div className="property-form__reception">
              <div>
                <label
                  htmlFor="reception"
                  className="property-form__label-checkbox"
                >
                  Are there common spaces such as living room, reception room,
                  etc.?
                </label>
                {receptionError && (
                  <p className="error-message">Please select an option.</p>
                )}
              </div>
              <input
                type="checkbox"
                name="reception"
                id="reception"
                checked={isCheckedReception}
                value={reception || []}
                onChange={handleAddReception}
                className={`property-form__input-checkbox ${
                  titleError ? "property-form__input--error" : null
                }`}
              />
            </div>
            <div className="property-form__pets">
              <div>
                <label htmlFor="pets" className="property-form__label-checkbox">
                  Are pets allowed in this property?
                </label>
                {petsError && (
                  <p className="error-message">Please select an option.</p>
                )}
              </div>
              <input
                type="checkbox"
                name="pets"
                id="pets"
                checked={isCheckedPets}
                value={pets}
                onChange={handleAddPets}
                className={`property-form__input-checkbox ${
                  titleError ? "property-form__input--error" : null
                }`}
              />
            </div>
            <div className="property-form__outdoor">
              <div>
                <label
                  htmlFor="outdoor"
                  className="property-form__label-checkbox"
                >
                  Are there any outdoor spaces in this property such as balcony,
                  terrace, garden, etc.?
                </label>
                {outdoorError && (
                  <p className="error-message">Please select an option.</p>
                )}
              </div>
              <input
                type="checkbox"
                name="outdoor"
                id="outdoor"
                checked={isCheckedOutdoor}
                value={outdoor}
                onChange={handleAddOutdoor}
                className={`property-form__input-checkbox ${
                  titleError ? "property-form__input--error" : null
                }`}
              />
            </div>
            <div className="property-form__picture">
              <div className="property-form__picture-wrapper">
                <label htmlFor="picture" className="property-form__label-file">
                  Upload pictures of the property
                  <div className="property-form__label-icon">
                    <PhotoCameraFrontOutlinedIcon fontSize="inherit" />
                  </div>
                </label>
                {pictureError && (
                  <p className="error-message">Please upload a picture.</p>
                )}
              </div>
              <input
                type="file"
                name="picture"
                id="picture"
                accept="image/png, image/jpeg"
                onChange={handleAddPicture}
                className={`property-form__input-file ${
                  titleError ? "property-form__input--error" : null
                }`}
              />
            </div>
            <button className="property-form__button">Add Property</button>
          </div>
        </form>

        {success && (
          <div className="property-form__success-message">
            The property has been successfully added!
            <Link to="/properties" className="property-form__link">
              View Property
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
export default NewPropertyPage;
