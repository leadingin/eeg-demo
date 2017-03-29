import numpy as np
from shutil import copyfile

def main():
    # f_buffer = open('../data/buffer.json', 'w')
    # f_psd = open('../data/psd.json', 'w')
    f_buffer = open('./data/buffer.json', 'w')
    f_psd = open('./data/psd.json', 'w')
    fullbuff = np.random.uniform(0, 1, (8, 1920))  # create random full buffer
    fullsum = np.sum(fullbuff, axis=0)  # collapse buffer channels to 1

    # For testing
    psdf = np.arange(0, 64.25, 0.25)
    psdx = np.random.uniform(0, 0.01, (1, 257))  # each channel psd could be one band

    # How we are coding now
    psdxalpha = np.random.uniform(0, 0.01, (8, 257))  # each channel psd could be one band

    alphaSum = np.sum(psdx, axis=0) # sum of one band
    alphaSum.reshape( -1, 1) #format for feature set

    fullbuff = np.random.uniform(0, 1, (8, 1920))  # create random full buffer
    fullsum = np.sum(fullbuff, axis=0)  # collapse buffer channels to 1

    #print("fullsum:", fullsum)
    #f_buffer.write('{\n\"buffer\":[')
    #f_buffer.write(str(fullsum[0]))
    for n in fullsum:
        f_buffer.write(str(n))
        f_buffer.write(' ')
    #f_buffer.write('End')
    #f_buffer.write(']\n}')

    f_psd.write('{\n\"psd\":[')
    for a in psdx:
        for n in a:
            f_psd.write(str(n))
            f_psd.write(',')
    f_psd.write(']\n}')

    f_buffer.close()
    f_psd.close()

    # copyfile('../data/buffer.json', '../eeg/static/data/buffer_r.json')
    # copyfile('../data/psd.json', '../eeg/static/data/psd_r.json')

    copyfile('./data/buffer.json', 'eeg/static/data/buffer_r.json')
    copyfile('./data/psd.json', 'eeg/static/data/psd_r.json')
    print("done writing copy")


if __name__ == "__main__":
    main()
