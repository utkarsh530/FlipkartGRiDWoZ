# FlipkartGRiD 2.0 - Submission for Wheels of Zeus

## 1. Problem statement and Testing Dataset

[Round 3 Problem and Testing dataset](https://drive.google.com/file/d/1jqy-HowmuFyjAg4JJGNMoFHqkVBlwyl9/view?usp=sharing)


## 2. Dataset Links

### 2.1 Background Noise

- [UrbanSound8K](https://urbansounddataset.weebly.com/urbansound8k.html)
- [AudioSet Ontology by Freesound Datasets](https://annotator.freesound.org/fsd/)

### 2.2 Human Voice
- [AudioSet(Google)](https://research.google.com/audioset/)
- [Common Voice](https://voice.mozilla.org/en/datasets)
- [LibriSpeech](http://www.openslr.org/12/)

## 3. Research Papers and References

- [MMDenseLSTM: An efficient combination of convolutional and recurrent neural networks for audio source separation](https://arxiv.org/abs/1805.02410)
- [Unet Architecture](https://towardsdatascience.com/understanding-semantic-segmentation-with-unet-6be4f42d4b47)
- [Mel spectrogram using Librosa](https://towardsdatascience.com/getting-to-know-the-mel-spectrogram-31bca3e2d9d0)
- [Cocktail Party Source Separation using Deep Learning](https://www.mathworks.com/help/deeplearning/ug/cocktail-party-source-separation-using-deep-learning-networks.html)
- [Investigating Deep Neural Transformations for Spectrogram-based Musical Source Separation](https://arxiv.org/abs/1912.02591)

## Running the Script
```
pip install -r requirements.txt
python Test.py filename
```
The model is not uploaded on github, please download it from [this](https://drive.google.com/file/d/13b9FTOAF5rJMY52p8siBt8NxvpEcYAZW/view?usp=sharing) link.
The file should be in the same directory and the output would be generated in `<your_current_directory>/output/result.wav`

## Pix2Pix GAN Diagram
![gan](https://github.com/utkarsh530/FlipkartGRiDWoZ/blob/master/model_training/Screenshot%20from%202020-08-09%2013-14-35.png)
## Discriminator Model
![disc_model](https://github.com/utkarsh530/FlipkartGRiDWoZ/blob/master/model_training/discriminator_model.png)
## Generator Model
![gen_model](https://github.com/utkarsh530/FlipkartGRiDWoZ/blob/master/model_training/generator_model.png)
