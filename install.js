module.exports = async (kernel) => {
  let cmd = "uv pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/cpu"
  if (kernel.platform === 'darwin') {
    if (kernel.arch === "arm64") {
      cmd = "uv pip install torch torchaudio torchvision"
    } else {
      cmd = "uv pip install torch==2.1.2 torchaudio==2.1.2"
    }
  } else {
    if (kernel.gpu === 'nvidia') {
      if (kernel.gpu_model && / 50.+/.test(kernel.gpu_model)) {
        cmd = "uv pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu128"
      } else {
        cmd = "uv pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 xformers --index-url https://download.pytorch.org/whl/cu124"
      }
    } else if (kernel.gpu === 'amd') {
      cmd = "uv pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/rocm6.2"
    } 
  }
  return {
    "run": [{
      "method": "shell.run",
      "params": {
        "message": "git clone https://github.com/Doubiiu/DynamiCrafter app"
      }
    }, {
      "method": "shell.run",
      "params": {
        "path": "app",
        "venv": "env",
        "message": [
          "python -m pip install pip==24.0",
          cmd,
          "uv pip install -r requirements.txt",
          "uv pip install gradio==3.43.0 av==13.1.0",
          "uv pip install --upgrade omegaconf",
          "uv pip install opencv-python",
          "uv pip install opencv-contrib-python",
          "uv pip install lightning",
          "uv pip install decord==0.6.0",
          "uv pip install einops==0.3.0",
          "uv pip install imageio==2.9.0",
          "uv pip install numpy==1.24.2",
          "uv pip install omegaconf==2.1.1",
          "uv pip install pandas==2.0.0",
          "uv pip install Pillow==9.5.0",
          "uv pip install pytorch_lightning==1.9.3",
          "uv pip install PyYAML==6.0",
          "uv pip install setuptools==65.6.3",
          "uv pip install torch==2.0.0",
          "uv pip install torchvision",
          "uv pip install tqdm==4.65.0",
          "uv pip install transformers==4.25.1",
          "uv pip install moviepy",
          "uv pip install av",
          "uv pip install xformers",
          "uv pip install gradio",
          "uv pip install timm",
          "uv pip install scikit-learn",
          "uv pip install open_clip_torch==2.22.0",
          "uv pip install kornia",
          "uv pip install {{platform === 'darwin' ? 'eva-decord' : 'decord'}}",
        ]
      }
    }, {
      "method": "notify",
      "params": {
        "html": "Click 'text to video' or 'image to video' to start!"
      }
    }]
  }
}
