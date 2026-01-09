"use client";
import React, { useState } from 'react';
import "@/styles/objects.css";

export default function JSObjectsDemo() {
    const [formData, setFormData] = useState(null);
    const [methodOutput, setMethodOutput] = useState(null);
    const [copyMode, setCopyMode] = useState(null);
    const [copyData, setCopyData] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            age: parseInt(e.target.age.value) || 0,
            gender: e.target.gender.value,
            role: e.target.role.value,
            bio: e.target.bio.value,
            terms: e.target.terms.checked,
            address: {
                city: e.target.city.value,
                pincode: e.target.pincode.value
            }
        };
        setFormData(data);
        setMethodOutput(null);
        setCopyMode(null);
        setCopyData(null);
    };

    const showMethod = (method) => {
        if (!formData) return;
        setCopyMode(null);
        let result = "";
        if (method === 'keys') result = JSON.stringify(Object.keys(formData));
        if (method === 'values') result = JSON.stringify(Object.values(formData));
        if (method === 'entries') result = JSON.stringify(Object.entries(formData));
        setMethodOutput(`${method} => ${result}`);
    };

    const handleCopyInit = (mode) => {
        if (!formData) return;
        setMethodOutput(null);
        setCopyMode(mode);
        if (mode === 'shallow') {
            setCopyData({ ...formData });
        } else {
            setCopyData(structuredClone(formData));
        }
    };

    const handleCopyUpdate = (e) => {
        e.preventDefault();
        if (!copyData) return;

        const updatedCopy = {
            ...copyData,
            name: e.target.name.value,
            age: parseInt(e.target.age.value) || 0,
            address: {
                ...copyData.address,
                city: e.target.city.value,
                pincode: e.target.pincode.value
            }
        };

        setCopyData(updatedCopy);

        if (copyMode === 'shallow') {
            const cityChanged = updatedCopy.address.city !== formData.address.city;
            const pinChanged = updatedCopy.address.pincode !== formData.address.pincode;

            if (cityChanged || pinChanged) {
                setFormData(prev => ({
                    ...prev,
                    address: {
                        city: updatedCopy.address.city,
                        pincode: updatedCopy.address.pincode
                    }
                }));
            }
        }
    };

    return (
        <div className="objects-container">
            <div className="objects-column">
                <h2 className="objects-title">Enter Data</h2>

                <form onSubmit={handleSubmit}>
                    <label className="objects-label">Name</label>
                    <input className="objects-input" type="text" name="name" required placeholder="Enter name" />

                    <label className="objects-label">Email</label>
                    <input className="objects-input" type="email" name="email" required placeholder="Enter email" />

                    <label className="objects-label">Password</label>
                    <input className="objects-input" type="password" name="password" required placeholder="Enter password" />

                    <label className="objects-label">Age</label>
                    <input className="objects-input" type="number" name="age" required placeholder="Enter age" />

                    <label className="objects-label">Gender</label>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ marginRight: '15px' }}>
                            <input type="radio" name="gender" value="Male" required /> Male
                        </label>
                        <label>
                            <input type="radio" name="gender" value="Female" required /> Female
                        </label>
                    </div>

                    <label className="objects-label">Role</label>
                    <select className="objects-input" name="role" required defaultValue="">
                        <option value="" disabled>Select Role</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Manager">Manager</option>
                    </select>

                    <label className="objects-label">City</label>
                    <input className="objects-input" type="text" name="city" required placeholder="Enter city" />

                    <label className="objects-label">Pincode</label>
                    <input className="objects-input" type="text" name="pincode" required placeholder="Enter pincode" />

                    <label className="objects-label">Bio</label>
                    <textarea className="objects-input" name="bio" rows="3" placeholder="Enter bio"></textarea>

                    <div style={{ marginBottom: '15px' }}>
                        <label>
                            <input type="checkbox" name="terms" required /> I agree to terms and conditions
                        </label>
                    </div>

                    <button type="submit" className="objects-primary-btn">Submit</button>
                </form>
            </div>

            <div className="objects-column">
                <h2 className="objects-title">Result</h2>

                {formData ? (
                    <div>
                        <div className="objects-section-header">Object Structure</div>
                        <div className="objects-json-box">
                            <pre style={{ margin: 0 }}>
                                {JSON.stringify(formData, null, 4)}
                            </pre>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <button onClick={() => showMethod('keys')} className="objects-secondary-btn">keys()</button>
                            <button onClick={() => showMethod('values')} className="objects-secondary-btn">values()</button>
                            <button onClick={() => showMethod('entries')} className="objects-secondary-btn">entries()</button>
                            <button onClick={() => handleCopyInit('deep')} className="objects-secondary-btn">Deep Copy</button>
                            <button onClick={() => handleCopyInit('shallow')} className="objects-secondary-btn">Shallow Copy</button>
                        </div>

                        {methodOutput && (
                            <div className="objects-result-highlight">
                                <strong>Output:</strong> {methodOutput}
                            </div>
                        )}

                        {copyMode && copyData && (
                            <div className="comparison-section">
                                <div className="comparison-header">
                                    {copyMode === 'shallow' ? 'Shallow Copy' : 'Deep Copy'}
                                </div>

                                <div className="comparison-grid">
                                    <div className="comparison-card original">
                                        <span className="comparison-title">Original Data</span>
                                        <div style={{ fontSize: '0.9rem' }}>
                                            <div style={{ marginBottom: '5px' }}><b>Name:</b> {formData.name}</div>
                                            <div style={{ marginBottom: '5px' }}><b>Age:</b> {formData.age}</div>
                                            <div style={{ marginBottom: '5px' }}><b>City:</b> {formData.address.city}</div>
                                            <div><b>Pin:</b> {formData.address.pincode}</div>
                                        </div>
                                    </div>

                                    <div className="comparison-card copy">
                                        <span className="comparison-title">Copy Data</span>
                                        <form onSubmit={handleCopyUpdate}>
                                            <input className="objects-input" style={{ padding: '5px', marginBottom: '10px' }} defaultValue={copyData.name} name="name" label="Name" />
                                            <input className="objects-input" style={{ padding: '5px', marginBottom: '10px' }} type="number" defaultValue={copyData.age} name="age" />
                                            <input className="objects-input" style={{ padding: '5px', marginBottom: '10px' }} defaultValue={copyData.address.city} name="city" />
                                            <input className="objects-input" style={{ padding: '5px', marginBottom: '10px' }} defaultValue={copyData.address.pincode} name="pincode" />
                                            <button type="submit" className="objects-secondary-btn" style={{ width: '100%', background: '#f5a623', color: 'white', border: 'none' }}>Update</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="objects-placeholder">
                        <p>Object Data</p>
                    </div>
                )}
            </div>
        </div>
    );
}
