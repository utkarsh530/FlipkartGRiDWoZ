import keras
import numpy as np
import librosa
import sys 
from scipy.io.wavfile import write
import os
from pydub import AudioSegment
from pydub.silence import split_on_silence

def magnitude_db_and_phase_to_audio(frame_length, hop_length_fft, stftaudio_magnitude_db, stftaudio_phase):

    stftaudio_magnitude_rev = librosa.db_to_amplitude(stftaudio_magnitude_db, ref=1.0)

    audio_reverse_stft = stftaudio_magnitude_rev * stftaudio_phase
    audio_reconstruct = librosa.core.istft(audio_reverse_stft, hop_length=hop_length_fft, length=frame_length)

    return audio_reconstruct


def matrix_spectrogram_to_numpy_audio(m_mag_db, m_phase, frame_length, hop_length_fft)  :

    list_audio = []

    nb_spec = m_mag_db.shape[0]

    for i in range(nb_spec):

        audio_reconstruct = magnitude_db_and_phase_to_audio(frame_length, hop_length_fft, m_mag_db[i], m_phase[i])
        list_audio.append(audio_reconstruct)

    return np.vstack(list_audio)



g_model = keras.models.load_model("g_model_new3(2).h5")

file_name = sys.argv[1]

sound = AudioSegment.from_wav(file_name)
dBFS = sound.dBFS
chunks = split_on_silence(sound, 
    min_silence_len = 500,
    silence_thresh = dBFS-10)

res = chunks[0]
for i in range(1,len(chunks)):
    res += chunks[i]
res +=  AudioSegment.silent(duration=500)
res.export(file_name, format = 'wav')


audio,sr = librosa.load(file_name,16000)
n_fft = 511
hop_length_fft = 63
frame_length = 8064*2
chunk_mag = []
chunk_pha = []
i = 0
while (i+frame_length<len(audio)):
    stftaudio = librosa.stft(audio[i:i+frame_length], n_fft=n_fft, hop_length=hop_length_fft)
    stftaudio_magnitude, stftaudio_phase = librosa.magphase(stftaudio)

    stftaudio_magnitude_db = librosa.amplitude_to_db(
        stftaudio_magnitude, ref=np.max)
    chunk_mag.append(stftaudio_magnitude_db/80)
    chunk_pha.append(stftaudio_phase)
    i += frame_length

test_x = np.array(chunk_mag).reshape([len(chunk_mag),256,256,1])
pred_y = g_model.predict(test_x)

audio_denoise_recons = matrix_spectrogram_to_numpy_audio(pred_y[:,:,:,0]*80, np.array(chunk_pha), frame_length, hop_length_fft)
nb_samples = audio_denoise_recons.shape[0]
denoise_long = audio_denoise_recons.reshape(1, nb_samples * frame_length)*10

dirName = "output"
if not os.path.exists(dirName):
    os.mkdir(dirName)

write("output/result.wav", sr, denoise_long[0, :])

sound = AudioSegment.from_wav("output/result.wav")
dBFS = sound.dBFS
chunks = split_on_silence(sound, 
    min_silence_len = 1000,
    silence_thresh = dBFS-5)

max_val = 0
idx = 0
for i in range(len(chunks)):
    if(chunks[i].max>max_val):
        idx = i
        max_val = chunks[i].max
        
(chunks[idx]+5).export("output/result.wav", format = 'wav')







