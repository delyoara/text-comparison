
import chardet
# schimb numele pt a vedea encode
with open("data/text1.txt", "rb") as f:
    raw = f.read()
    result = chardet.detect(raw)
    print(result)
