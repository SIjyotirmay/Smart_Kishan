if __name__ == "__main__":

    import pandas as pd
    import torch
    from torch.utils.data import DataLoader , random_split
    import torch.nn as nn
    import torch.optim as optim
    from torchvision import datasets, transforms

    print("CUDA Available:", torch.cuda.is_available())
    print("CUDA Device Name:", torch.cuda.get_device_name(0) if torch.cuda.is_available() else "No GPU")


    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Using device: {device}")

#preprocessing

    transform = transforms.Compose([
        transforms.Resize((224,224)),
        transforms.RandomHorizontalFlip(p=0.5),
        transforms.RandomRotation(degrees=20),
        transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2),
        transforms.ToTensor(),
        transforms.Normalize([0.5]*3, [0.5]*3)
    ])

#Load data
    dataset = datasets.ImageFolder(root='./PlantVillage', transform=transform)
    print("Number of classes:", len(dataset.classes))


# #split data
#     train_size = int(0.8 * len(dataset))
#     test_size = len(dataset) - train_size
#     train_dataset, test_dataset = random_split(dataset, [train_size, test_size])


# #create train test DataLoader objects
#     train_loader = DataLoader(train_dataset, batch_size=32, shuffle= True, pin_memory=True, num_workers=2)
#     test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False, pin_memory= True, num_workers=2)

#     class MyCNN(nn.Module):

#         def __init__(self, channels, classes):
#             super().__init__()
#             self.features = nn.Sequential(
#                 nn.Conv2d(channels,32, kernel_size=3,padding='same'),
#                 nn.BatchNorm2d(32),
#                 nn.ReLU(),
#                 nn.MaxPool2d(kernel_size=2, stride=2),


#                 nn.Conv2d(32,64, kernel_size=3,padding='same'),
#                 nn.BatchNorm2d(64),
#                 nn.ReLU(),
#                 nn.MaxPool2d(kernel_size=2, stride=2),


#                 nn.Conv2d(64,128, kernel_size=3,padding='same'),
#                 nn.BatchNorm2d(128),
#                 nn.ReLU(),
#                 nn.MaxPool2d(kernel_size=2, stride=2),

                
#                 nn.Conv2d(128,256, kernel_size=3,padding='same'),
#                 nn.BatchNorm2d(256),
#                 nn.ReLU(),
#                 nn.MaxPool2d(kernel_size=2, stride=2),

                
#                 nn.Conv2d(256,512, kernel_size=3,padding='same'),
#                 nn.BatchNorm2d(512),
#                 nn.ReLU(),
#                 nn.MaxPool2d(kernel_size=2, stride=2),

 
#             )
#             self.classifier = nn.Sequential(
#                 nn.Flatten(),

#                 nn.Linear(512*7*7, 128),
#                 nn.ReLU(),
#                 nn.Dropout(p = 0.3),

#                 nn.Linear(128,classes)

#             )

#         def forward(self,x):
#             x = self.features(x)
#             x = self.classifier(x)

#             return x
    



   
# #set learning rate and epochs
#     epochs = 30
#     learning_rate = 0.001

# #instantiate the model
#     nclasses = len(dataset.classes)
#     model = MyCNN(3,classes=nclasses)
#     model = model.to(device)    

# #loss function
#     criterion = nn.CrossEntropyLoss()

# #optimizer
#     optimizer = optim.Adam(model.parameters(),lr = 0.001, weight_decay=1e-4)


# #training loop
#     for epoch in range (epochs):
#         model.train()
#         total_epoch_loss = 0
#         for batch_features, batch_labels in train_loader:
#         #move data to gpu
#             batch_features,batch_labels=batch_features.to(device), batch_labels.to(device)
#         #forward pass
#             outputs = model(batch_features)
#         #calculate loss
#             loss = criterion(outputs, batch_labels)
#         #back pass
#             optimizer.zero_grad()
#             loss.backward()

#         #update grads
#             optimizer.step()

#             total_epoch_loss += loss.item()

#         avg_loss = total_epoch_loss / len(train_loader)
#         print(f'Epoch: {epoch+1}, Loss = {avg_loss}')



# #Evaluation of the model

#     model.eval()

#     total = 0 
#     correct = 0



#     with torch.no_grad():
#         for batch_features,batch_labels in train_loader:
#         #move data to gpu
#             batch_features,batch_labels=batch_features.to(device), batch_labels.to(device)
#             outputs = model(batch_features)
#             _,predicted = torch.max(outputs, 1)
#             total += batch_labels.shape[0]
#             correct += (predicted==batch_labels).sum().item()


#     print("Accuracy in train data:")
#     print(correct/total)
        

#     with torch.no_grad():
#         for batch_features,batch_labels in test_loader:
#         #move data to gpu
#             batch_features,batch_labels=batch_features.to(device), batch_labels.to(device)
#             outputs = model(batch_features)
#             _,predicted = torch.max(outputs, 1)
#             total += batch_labels.shape[0]
#             correct += (predicted==batch_labels).sum().item()


#     print("Accuracy in test data:")
#     print(correct/total)
        
 
#     from sklearn.metrics import f1_score

#     def evaluate_f1(model, loader, device):
#         model.eval()
#         all_preds = []
#         all_labels = []

#         with torch.no_grad():
#             for images, labels in loader:
#                 images = images.to(device)
#                 labels = labels.to(device)

#                 outputs = model(images)
#                 _, preds = torch.max(outputs, 1)

#                 all_preds.extend(preds.cpu().numpy())
#                 all_labels.extend(labels.cpu().numpy())

#         f1 = f1_score(all_labels, all_preds, average='weighted')  # or 'macro', 'micro'
#         return f1


# # Evaluate F1 on training data
#     train_f1 = evaluate_f1(model, train_loader, device)
#     print(f"Train F1 Score: {train_f1:.4f}")

# # Evaluate F1 on test data
#     test_f1 = evaluate_f1(model, test_loader, device)
#     print(f"Test F1 Score: {test_f1:.4f}")