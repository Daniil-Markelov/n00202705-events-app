import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Preferences = () => {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState('');
  const [eventTypes, setEventTypes] = useState([]);
  const [location, setLocation] = useState('');
  const [preferencesSaved, setPreferencesSaved] = useState(false);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleEventTypeSelect = (selectedEventType) => {
    if (eventTypes.includes(selectedEventType)) {
      setEventTypes(eventTypes.filter((type) => type !== selectedEventType));
    } else {
      setEventTypes([...eventTypes, selectedEventType]);
    }
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  const handleSavePreferences = () => {
    // add laravel code here
    setPreferencesSaved(true);
    //printing the output of the saved preferences to Console
    console.log(JSON.stringify({ gender, eventTypes, location }, null, 2));
  };

  const handleRestart = () => {
    setPreferencesSaved(false);
    setStep(1);
    setGender('');
    setEventTypes([]);
    setLocation('');
    // eslint-disable-next-line
  {/* add the dealtion of the saved pref in laravel when this is used*/ }
  };

  const isNextDisabled = () => {
    if (step === 1) {
      return !gender;
    } else if (step === 2) {
      return eventTypes.length === 0;
    } else if (step === 3) {
      return !location;
    }
    return false;
  };

  return (
    <div className="container">
      <h1>Preferences</h1>
      {!preferencesSaved ? (
        <div className="card">
          <div className="card-body">
            {step === 1 && (
              <>
                <h2 className="card-title">Gender</h2>
                <div className="btn-group">
                  <button
                    className={`btn ${gender === 'Male' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleGenderSelect('Male')}
                  >
                    Male
                  </button>
                  <button
                    className={`btn ${gender === 'Female' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleGenderSelect('Female')}
                  >
                    Female
                  </button>
                  <button
                    className={`btn ${gender === 'Other' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleGenderSelect('Other')}
                  >
                    Other
                  </button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="card-title">Type of Events</h2>
                <div className="btn-group">
                  <button
                    className={`btn ${eventTypes.includes('Concerts') ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleEventTypeSelect('Concerts')}
                  >
                    Concerts
                  </button>
                  <button
                    className={`btn ${eventTypes.includes('Social Events') ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleEventTypeSelect('Social Events')}
                  >
                    Social Events
                  </button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h2 className="card-title">Location</h2>
                <div className="btn-group">
                  <button
                    className={`btn ${location === 'UK' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleLocationSelect('UK')}
                  >
                    UK
                  </button>
                  <button
                    className={`btn ${location === 'Ireland' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleLocationSelect('Ireland')}
                  >
                    Ireland
                  </button>
                  <button
                    className={`btn ${location === 'US' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleLocationSelect('US')}
                  >
                    US
                  </button>
                </div>
              </>
            )}
            <div className="mt-3">
              {step > 1 && <button className="btn btn-secondary me-2" onClick={handleBackStep}>Back</button>}
              {step < 3 && <button className="btn btn-primary" onClick={handleNextStep} disabled={isNextDisabled()}>Next</button>}
              {step === 3 && <button className="btn btn-success" onClick={handleSavePreferences}>Save Preferences</button>}
            </div>
          </div>
        </div>
      ) : (
        <div className="card text-center">
          <div className="card-body">
            <h2>Preferences Saved</h2>
            <button className="btn btn-primary" onClick={handleRestart}>Start Over</button>
            <Link className="btn btn-success" to="/">Home</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preferences;


