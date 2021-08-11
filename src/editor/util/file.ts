
export function pickFile (opts: {
  success: (data: { file: File }) => void;
  error?: (err: any) => void;
}) {
  const { success, error } = opts;
  let input: HTMLInputElement | null = document.createElement('input') as HTMLInputElement;
  input.type = 'file';
  input.addEventListener('change', function() {
    if (this.files !== null) {
      const file: File = this.files[0];
      success({
        file: file,
      });
      input = null;
    } else {
      if (typeof error === 'function') {
        error(Error('input.files is null'));
      }
    }
  });
  input.addEventListener('error', function(err) {
    if (typeof error === 'function') {
      error(err);
    }
    input = null;
  })
  input.click();
}

export function parseFileToBase64(file: File): Promise<string | ArrayBuffer> {
  return new Promise(function(resolve, reject) {
    let reader: FileReader|null = new FileReader();
    reader.addEventListener('load', function() {
      if (this.result) {
        resolve(this.result);
      } else {
        reject();
      }
      reader = null;
    });
    reader.addEventListener('error', function(err) {
      // reader.abort();
      reject(err);
      reader = null;
    });
    reader.addEventListener('abort', function() {
      reject(new Error('abort'));
      reader = null;
    })
    reader.readAsDataURL(file);
  })
} 

export function parseFileToText(file: File): Promise<string | ArrayBuffer> {
  return new Promise(function(resolve, reject) {
    let reader: FileReader | null = new FileReader();
    reader.addEventListener('load', function() {
      if (this.result) {
        resolve(this.result);
      } else {
        reject();
      }
      reader = null;
    });
    reader.addEventListener('error', function(err) {
      // reader.abort();
      reject(err);
      reader = null;
    });
    reader.addEventListener('abort', function() {
      reject(new Error('abort'));
      reader = null;
    })
    reader.readAsText(file);
  })
} 