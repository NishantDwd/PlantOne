export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: 'Validation Error',
      message: err.message 
    });
  }

  // Database errors
  if (err.code === '23505') { 
    return res.status(409).json({ 
      error: 'Duplicate Entry',
      message: 'A record with this data already exists' 
    });
  }

  // Default error
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
};