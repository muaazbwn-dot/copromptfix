
CREATE POLICY "Read prompt images" ON storage.objects
FOR SELECT TO anon, authenticated USING (bucket_id = 'prompt-images');

CREATE POLICY "Upload prompt images" ON storage.objects
FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'prompt-images');
