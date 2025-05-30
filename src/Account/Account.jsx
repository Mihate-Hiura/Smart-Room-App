import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import './account.css';
import { useEffect, useState } from 'react';

function Account() {
    const [user, setUser] = useState({ uname: '', fname: '', lname: '', email: '', pw: '' });

    useEffect(() => {
        async function fetchUserInfo() {
            const uname = getCookie("username");
            console.log("Username from cookie:", uname);
            if (uname) {
                try {
                    const res = await fetch("/api/user/getUserInfo", {
                        method: 'POST',
                        headers: { "Content-Type": 'application/json' },
                        body: JSON.stringify({ username: uname })
                    });
                    const data = await res.json();
                    setUser({
                        uname: data.uname,
                        lname: data.lname,
                        fname: data.fname,
                        email: data.email,
                        pw: data.pw
                    });
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        }
        fetchUserInfo();
    }, []);

    const handleUpdateField = (fieldId) => {
        const inputField = document.querySelector(`#${fieldId}`);
        if (inputField.readOnly) {
            inputField.readOnly = false;
            inputField.focus();
            inputField.classList.add('editable');
            inputField.classList.add('active');
        } else {
            inputField.readOnly = true;
            inputField.classList.remove('editable');
            inputField.classList.remove('active');
        }
    };

    const handleChangePassword = () => {
        window.location.href = "/ResetPassword";
    };

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            const uname = getCookie("username");
            const res = await fetch("/api/user/deleteAccount", {
                method: 'DELETE',
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify({ username: uname })
            });
            const data = await res.json();
            if (data.success) {
                alert("Account deleted successfully.");
                document.cookie = "username=; path=/; max-age=0";
                window.location.href = "/";
            } else {
                alert(data.message);
            }
        }
    };

    const handleSave = async () => {
        const res = await fetch("/api/user/updateAccount", {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({ fname: user.fname, lname: user.lname })
        });
        const data = await res.json();
        if (data.success) {
            alert("Account updated successfully.");
            window.location.reload();
        } else {
            alert(data.message);
        }
    };

    // getCookie function stays the same
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    return (
        <section className="account-card">
            <div className="account-info card">
                <h3>Account Information</h3>
                <div className="field-item">
                    <label htmlFor="uname">Username:&nbsp;</label>
                    <input type="text" id="uname" name="uname" readOnly value={user.uname} />
                </div>
                <div className="field-item">
                    <label htmlFor="email">Email:&nbsp;</label>
                    <input type="email" id="email" name="email" readOnly value={user.email} />
                </div>
                <div className="field-item">
                    <label htmlFor="fname">First Name:&nbsp;</label>
                    <input type="text" id="fname" name="fname" readOnly value={user.fname} />
                    <FontAwesomeIcon icon={faPen} className="edit-icon" title="Edit" onClick={() => handleUpdateField('fname')} />
                </div>
                <div className="field-item">
                    <label htmlFor="surname">Last Name:&nbsp;</label>
                    <input type="text" id="lname" name="surname" readOnly value={user.lname} />
                    <FontAwesomeIcon icon={faPen} className="edit-icon" title="Edit" onClick={() => handleUpdateField('lname')} />
                </div>
                <div className="field-item">
                    <label htmlFor="password">Password:&nbsp;</label>
                    <input type="password" id="password" name="password" onCopy={e => e.preventDefault()} onCut={e => e.preventDefault()} readOnly value={user.pw} />
                    <button className="change-pw-btn" onClick={handleChangePassword}>Change Password</button>
                </div>
                <div className="field-item">
                    <button className="dlt-acc-btn" onClick={handleDelete}>Delete Account</button>
                </div>
                <div className="field-item">
                    <button className="save-btn" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
            <div className="home-mem card">
                <h3>Family</h3>
                <p></p>
                <p>member(s)</p>
                <hr />
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* ... */}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Account;