import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {getCookie} from '../App.jsx'
import './account.css';

function Account() {
    const [user, setUser] = useState({ uname: '', fname: '', lname: '', email: '', pw: '' });
    const [editFields, setEditFields] = useState({ fname: false, lname: false });
    const [members, setMembers] = useState([]); // Array of family members
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of members per page

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
        async function fetchFamilyMembers() {
            // Assuming you have an API endpoint to fetch family members
            try {
                const res = await fetch("/api/user/getAllAccounts", {
                    method: 'POST',
                    headers: { "Content-Type": 'application/json' },
                    body: JSON.stringify({ username: getCookie("username") })
                });
                const data = await res.json();
                console.log("Family members data:", data);
                setMembers(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching family members:", error);
            }
        }

        fetchUserInfo();
        fetchFamilyMembers();
    }, []);

    // Calculate indices for current members
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMembers = members.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(members.length / itemsPerPage);

    console.log("Current members:", currentMembers);
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const fnameRef = useRef(null);
    const lnameRef = useRef(null);

    const handleUpdateField = (field) => {
        setEditFields(prevState => {
            const newValue = !prevState[field];
            // Call focus on the corresponding input if entering edit mode
            setTimeout(() => {
                if (newValue) {
                    if (field === 'fname' && fnameRef.current) {
                        fnameRef.current.focus();
                    } else if (field === 'lname' && lnameRef.current) {
                        lnameRef.current.focus();
                    }
                }
            }, 0);
            return { ...prevState, [field]: newValue };
        });
    };

    const handleChangePassword = () => {
        window.location.href = "/ResetPassword";
    };

    const handleDelete = async () => {
        if (confirm("⚠️ Are you sure you want to delete your account?\nThis action cannot be undone.")) {
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
                alert(data.errors);
            }
        }
    };

    const handleSave = async () => {
        const res = await fetch("/api/user/updateAccount", {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({ fname: user.fname, lname: user.lname, uname: user.uname })
        });
        const data = await res.json();
        if (data.success) {
            alert("Account updated successfully!");
            window.location.reload();
        } else {
            alert(data.message);
        }
    };

    return (
        <section className="account-card">
            <div className="account-info card">
                <h3>Account Information</h3><hr></hr>

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
                    <input
                        type="text"
                        id="fname"
                        name="fname"
                        ref={fnameRef}
                        readOnly={!editFields.fname}
                        value={user.fname}
                        onChange={e => setUser({ ...user, fname: e.target.value })}
                    />
                    <FontAwesomeIcon icon={faPen} className="edit-icon" title="Edit" onClick={() => handleUpdateField('fname')} />
                </div>
                <div className="field-item">
                    <label htmlFor="surname">Last Name:&nbsp;</label>
                    <input
                        type="text"
                        id="lname"
                        name="surname"
                        ref={lnameRef}
                        readOnly={!editFields.lname}
                        value={user.lname}
                        onChange={e => setUser({ ...user, lname: e.target.value })}
                    />
                    <FontAwesomeIcon icon={faPen} className="edit-icon" title="Edit" onClick={() => handleUpdateField('lname')} />
                </div>
                <div className="field-item">
                    <label htmlFor="password">Password:&nbsp;</label>
                    <input type="password" id="password" name="password" onCopy={e => e.preventDefault()} onCut={e => e.preventDefault()} readOnly value={user.pw} />
                    <button className="change-pw-btn" onClick={handleChangePassword}>Change Password</button>
                </div>

                <div className='field-item'>
                    <button className="dlt-acc-btn" onClick={handleDelete}>Delete Account</button>
                    <button className="save-btn" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
            <div className="home-mem card">
                <h3>Family</h3>
                <hr />
               <div className="table-container">
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
                            {currentMembers.map((member, index) => (
                                <tr key={member.id || index}>
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{member.username}</td>
                                    <td>{member.email}</td>
                                    <td>{member.fname}</td>
                                    <td>{member.lname}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="pagination">
                    {currentPage > 1 && (
                      <button className="page-btn" onClick={goToPreviousPage}>
                        <FontAwesomeIcon icon={faChevronLeft} /> Prev
                      </button>
                    )}
                    <span className="page-info">
                      Page {currentPage} of {totalPages}
                    </span>
                    {currentPage < totalPages && (
                      <button className="page-btn" onClick={goToNextPage}>
                        Next <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    )}
                  </div>
                )}
            </div>
        </section>
    );
}

export default Account;