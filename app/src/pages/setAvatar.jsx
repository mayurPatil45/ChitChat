import { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import { conf } from "../utils/conf";
import Button from "../components/layout/Button";
import toast from "react-hot-toast";

export default function SetAvatar() {
    const avatarKey = conf.avatarKey;
    const [avatar, setAvatar] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('chat-user')) {
            navigate('/login')
        }
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = [];
            for (let i = 0; i < 5; i++) {
                const response = await axios.get(`https://api.multiavatar.com/${avatarKey}/${Math.random() * 1000}`);
                const buffer = Buffer.from(response.data, 'binary').toString('base64');
                data.push(buffer);
            }
            setAvatar(data);
            setLoading(false);
            setDataFetched(true);
        } catch (error) {
            console.error("Error occurred:", error);
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!dataFetched) {
            fetchData();
        }

    }, [dataFetched]);

    const handleRefresh = () => {
        fetchData();
    };

    async function handleSetAvatar() {
        if (selectedAvatar === null) {
            return toast.error('Please select an avatar');
        } else {
            try {
                const user = JSON.parse(localStorage.getItem('chat-user'));
                const response = await axios.post(`${setAvatarRoute}/${user._id}`, { image: selectedAvatar });

                if (response.status === 201) {
                    user.avatar = response.data.avatar;
                    user.isAvatar = true;
                    localStorage.setItem('chat-user', JSON.stringify(user));
                    toast.success('Avatar set successfully');
                    navigate('/home');
                } else {
                    toast.error('Error occurred while setting avatar');
                }
            } catch (error) {
                console.error('Error setting avatar:', error);
                toast.error('Error occurred while setting avatar');
            }
        }
    }

    return (
        <div className="px-3 py-5 flex flex-col items-center justify-center mt-16 bg-slate-50 rounded-lg">
            <h1 className="text-4xl uppercase font-bold">Choose Your Avatar</h1>
            <div className='flex gap-10 justify-center my-10 p-3'>
                {loading ? <p>Loading...</p>
                    : error ? <p className="font-semibold text-xl text-red-500">Servers Are Busy, Try After Some times!!!</p>
                        : avatar && avatar.map((item, index) => (
                            <div key={index} onClick={() => setSelectedAvatar(item)} className={`border-4 hover:border-black p-2 rounded-full transition-all ease-in ${selectedAvatar === item ? 'border-black' : ''}`}>
                                <img src={`data:image/svg+xml;base64,${item}`} alt="avatar" width="150px" loading="lazy" />
                            </div>
                        ))
                }
            </div>

            <div>
                <Button className="m-5 px-5" onClick={handleRefresh} >Referesh</Button>
                <Button className="m-5 px-5" onClick={handleSetAvatar} >Set Avatar</Button>
            </div>

        </div>
    );
}
