import React, { useState } from 'react';
import axios from 'axios';
import BackButton from './BackButton';
const WebhookSimulator = ({bmr}) => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const res = await axios.post('/api/webhook', { message });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {bmr && (
        <div className="component-bmr-display">
          Your BMR: {bmr.toFixed(0)} calories/day
        </div>
      )}
    
    <div className="webhook-simulator">
      <BackButton />
      <h2>Webhook Simulator</h2>
      <p>Simulate a WhatsApp message to log a meal. Example: "log lunch: Jeera Rice, Dal"</p>
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Message</label>
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder='e.g., "log lunch: Jeera Rice, Dal"'
            required
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      
      {response && (
        <div className="response">
          <h3>Response:</h3>
          <pre>{response}</pre>
        </div>
      )}
    </div>
    </div>
  );
};
export default WebhookSimulator;
