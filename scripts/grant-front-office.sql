-- Grant front office access to multimediadrw@gmail.com
-- Run this SQL directly in your database

-- Option 1: Grant front office access only
UPDATE "User" 
SET "isFrontOffice" = true 
WHERE email = 'multimediadrw@gmail.com';

-- Option 2: Grant both front office and admin access (recommended)
UPDATE "User" 
SET "isFrontOffice" = true, "isAdmin" = true 
WHERE email = 'multimediadrw@gmail.com';

-- Verify the update
SELECT id, email, "isFrontOffice", "isAdmin", "createdAt"
FROM "User" 
WHERE email = 'multimediadrw@gmail.com';
