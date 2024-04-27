import React, { useState, FormEvent } from 'react';
import axios from 'axios';

interface LoginResponse {
  token: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/login', {
        email,
        password,
      });

      console.log('Login successful');
      console.log('Response:', response.data); // Assuming the response contains some data

      // If you have defined a type for the response data, you can access it like this:
      const responseData = response.data as LoginResponse;
      console.log('Token:', responseData.token);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div style={{height:'300px', width:'140px', alignSelf:'center'}}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
